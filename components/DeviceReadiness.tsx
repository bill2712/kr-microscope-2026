import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, MonitorCheck, TriangleAlert } from 'lucide-react';
import { Language } from '../types';

interface DeviceReadinessProps {
  lang: Language;
}

const storageAvailable = () => {
  try {
    localStorage.setItem('kr_microscope_storage_check', '1');
    localStorage.removeItem('kr_microscope_storage_check');
    return true;
  } catch {
    return false;
  }
};

const webGlAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

export const DeviceReadiness: React.FC<DeviceReadinessProps> = ({ lang }) => {
  const [online, setOnline] = useState(() => navigator.onLine);
  const copy = lang === 'zh'
    ? {
        title: '裝置準備檢查', allReady: '基本功能已準備好', attention: '部分功能可能受限制',
        available: '可使用', unavailable: '需要注意', note: '只檢查瀏覽器支援，不會讀取個人資料。',
        items: { storage: '保存模式及學習進度', graphics: '3D／AR 圖像', offline: '離線快取', network: '目前網絡' },
      }
    : {
        title: 'Device readiness check', allReady: 'Core features are ready', attention: 'Some features may be limited',
        available: 'Available', unavailable: 'Check needed', note: 'This checks browser support only and does not read personal data.',
        items: { storage: 'Save mode and progress', graphics: '3D / AR graphics', offline: 'Offline cache', network: 'Current connection' },
      };

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const checks = useMemo(() => [
    { label: copy.items.storage, ready: storageAvailable() },
    { label: copy.items.graphics, ready: webGlAvailable() },
    { label: copy.items.offline, ready: 'serviceWorker' in navigator },
    { label: copy.items.network, ready: online },
  ], [copy.items, online]);
  const allReady = checks.every((check) => check.ready);

  return (
    <details className="group mt-5 rounded-2xl border border-white/10 bg-slate-900/55 text-left">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 focus-visible:outline-none">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${allReady ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
          {allReady ? <MonitorCheck size={19} /> : <TriangleAlert size={19} />}
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block text-sm text-white">{copy.title}</strong>
          <span className="text-xs text-slate-400">{allReady ? copy.allReady : copy.attention}</span>
        </span>
        <ChevronDown className="text-slate-400 transition-transform group-open:rotate-180" size={18} />
      </summary>
      <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm">
            {check.ready ? <CheckCircle2 className="text-emerald-300" size={17} /> : <TriangleAlert className="text-amber-300" size={17} />}
            <span className="flex-1 text-slate-200">{check.label}</span>
            <span className="text-xs text-slate-400">{check.ready ? copy.available : copy.unavailable}</span>
          </div>
        ))}
        <p className="text-xs leading-5 text-slate-500 sm:col-span-2">{copy.note}</p>
      </div>
    </details>
  );
};

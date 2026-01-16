#!/bin/bash
SRC="/Users/billtsang/.gemini/antigravity/brain/ceeced05-973e-42f1-9de3-245a18637b41"
DEST="/Users/billtsang/Downloads/kr-amazing-telescope/kr-microscope-2026/public/images"

# Function to copy to 3 variant names
copy_variant() {
  local src_pattern=$1
  local dest_base=$2
  
  # Find the latest generated file for this pattern
  local file=$(ls -t "$SRC"/${src_pattern}*.png 2>/dev/null | head -n 1)
  
  if [ -f "$file" ]; then
    cp "$file" "$DEST/${dest_base}_100x.png"
    cp "$file" "$DEST/${dest_base}_400x.png"
    cp "$file" "$DEST/${dest_base}_1200x.png"
    echo "Copied $file to ${dest_base} variants"
  else
    echo "Warning: Source for $src_pattern not found"
  fi
}

copy_variant "potato_starch_microscope" "potato_starch"
copy_variant "carrot_root_celss_microscope" "carrot_root"
copy_variant "butterfly_leg_microscope" "butterfly_leg"
copy_variant "honeybee_leg_microscope" "honeybee_leg"
copy_variant "honeybee_wing_microscope" "honeybee_wing"
copy_variant "locust_wing_microscope" "locust_wing"
copy_variant "camellia_pollen_microscope" "camellia_pollen"
copy_variant "tulip_pollen_microscope" "tulip_pollen"
copy_variant "lily_pollen_microscope" "lily_pollen"
copy_variant "sunflower_pollen_microscope" "sunflower_pollen"
copy_variant "holly_leaf_microscope" "holly_leaf"
copy_variant "corn_stem_microscope" "corn_stem"
copy_variant "pigeon_feather_microscope" "pigeon_feather"
copy_variant "canary_feather_microscope" "canary_feather"
copy_variant "cat_hair_microscope" "cat_hair"
copy_variant "plankton_egg_microscope" "plankton_egg"
copy_variant "dandelion_fuzz_microscope" "dandelion_fuzz"
copy_variant "goldfish_scale_microscope" "goldfish_scale"

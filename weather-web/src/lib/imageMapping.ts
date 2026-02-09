export const skinImageMap: Record<string, string> = {
  // デフォ
  'default': '/skins/default-skin.png',

  // Head skins
  'head_nit': '/skins/head/nit.png',
  'head_horn': '/skins/head/horn.png',
  'head_ribbon': '/skins/head/ribbon.png',
  'head_sunglasses': '/skins/head/sunglasses.png',
  'head_maid': '/skins/head/maid.png',
  'head_cat': '/skins/head/cat.png',
  'head_hat': '/skins/head/hat.png',
  'head_ring': '/skins/head/ring.png',

  // Body skins
  'body_bow': '/skins/body/bow.png',
  'body_choker': '/skins/body/choker.png',
  'body_collor': '/skins/body/collor.png',
  'body_name': '/skins/body/name.png',
  'body_scarf': '/skins/body/scarf.png',
  'body_tie': '/skins/body/tie.png',

  // Base skins
  
};

export const getSkinImagePath = (imageKey: string | undefined): string => {
  if (!imageKey) return '/skins/default-skin.png';
  return skinImageMap[imageKey] || '/skins/default-skin.png';
};

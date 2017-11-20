/**
 * Created by Aleksandr_Medvedev on 7/31/17.
 */

export default function getMixedStyle(propsStyle, initialStyle) {
  if (!initialStyle) {
    return propsStyle;
  } else if (!propsStyle) {
    return initialStyle;
  }

  let mixedStyle = [];
  if (Array.isArray(initialStyle)) {
    mixedStyle = mixedStyle.concat(initialStyle);
  } else {
    mixedStyle.push(initialStyle);
  }

  if (Array.isArray(propsStyle)) {
    mixedStyle = mixedStyle.concat(propsStyle);
  } else {
    mixedStyle.push(propsStyle);
  }

  return mixedStyle;
}

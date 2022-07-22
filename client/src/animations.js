const anOn = "animate__animated ";
const anDel1s = 'animate__delay-1s ';
const anDel2s = 'animate__delay-2s ';

//in
export const anFade = anOn + 'animate__fadeIn ';
export const anFadeSlow = anOn + 'animate__fadeIn ' + 'animate__slow';
export const anFade1s = anOn + 'animate__fadeIn ' + anDel1s;
export const anFade2sSlow = anOn + 'animate__fadeIn ' + anDel2s + 'animate__slow';
export const anFadeLeft2s = anOn + 'animate__fadeInLeft ' + anDel2s;

//out
export const anFadeOut = anOn + 'animate__fadeOut ';
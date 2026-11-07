# Noto Sans subset

Regular, italic and bold Noto Sans, reduced to the Latin range and the Pāli letters with diacritics (Ā ā Ī ī Ū ū Ḍ ḍ Ḷ ḷ Ṁ ṁ Ṃ ṃ Ṅ ṅ Ṇ ṇ Ṭ ṭ). Licensed under the SIL Open Font License 1.1 ([OFL.txt](OFL.txt)).

Made with [fontTools](https://github.com/fonttools/fonttools) (`pip install fonttools brotli`) from the variable fonts in [google/fonts](https://github.com/google/fonts/tree/main/ofl/notosans):

```sh
fonttools varLib.instancer "NotoSans[wdth,wght].ttf" wght=400 wdth=100 -o regular.ttf --update-name-table
fonttools varLib.instancer "NotoSans[wdth,wght].ttf" wght=700 wdth=100 -o bold.ttf --update-name-table
fonttools varLib.instancer "NotoSans-Italic[wdth,wght].ttf" wght=400 wdth=100 -o italic.ttf --update-name-table

UNICODES='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD,U+0100-0101,U+012A-012B,U+016A-016B,U+1E0C-1E0D,U+1E36-1E37,U+1E40-1E47,U+1E6C-1E6D'
for s in regular bold italic; do
  pyftsubset $s.ttf --unicodes="$UNICODES" --layout-features+=tnum --no-hinting --flavor=woff2 --output-file=noto-sans-$s.woff2
done
```

The first part of `UNICODES` is Google Fonts' Latin subset range; the rest are the Pāli letters. To support a new character, add it to `UNICODES` and run the commands again.

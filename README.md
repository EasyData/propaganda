Propaganda (Fake News in China)
===============================

![](https://github.com/easydata/propaganda/actions/workflows/update.yml/badge.svg)

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Spectators_in_front_of_a_large_sign_on_Nixon%27s_motorcade_route_in_China._-_NARA_-_194413.tif/lossy-page1-440px-Spectators_in_front_of_a_large_sign_on_Nixon%27s_motorcade_route_in_China._-_NARA_-_194413.tif.jpg)

## Supported Sites

- [x] baidu
- [x] bilibili
- [x] so
- [x] sogou
- [x] toutiao
- [x] weibo
- [x] zhihu

## Latest News

```bash
curl -s https://api.github.com/repos/EasyData/propaganda/releases/latest |
  jq -r '.assets[]|select(.name|test("json$")).browser_download_url' |
    wget -q -i- -O- |
      less
```

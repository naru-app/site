# App Store 출시 전환

공식 한국어 App Store 배지는 `assets/app-store-badge-ko.svg`에 준비되어 있습니다.
자산 출처는 Apple Marketing Tools이며, 배지 자체를 수정하지 않습니다.

`index.html`·`en/index.html`·`ja/index.html`의 `app-store-badge-link`에는 제품 페이지 주소
`https://apps.apple.com/app/id6801597847`가 이미 들어 있습니다. 출시일에 세 파일에서:

1. `app-store-badge-link`의 `hidden` 속성을 지웁니다.
2. 같은 `hero-actions` 안의 `release-notice-button`(TestFlight)을 지웁니다.
3. 헤더의 `header-action`과 마지막 섹션의 TestFlight 버튼을 App Store 링크로 바꿉니다.

Apple 지침에 따라 한 레이아웃에는 배지를 하나만 노출하고, 높이 40px 이상을 유지합니다.

# App Store 출시 전환

공식 한국어 App Store 배지는 `assets/app-store-badge-ko.svg`에 준비되어 있습니다.
자산 출처는 Apple Marketing Tools이며, 배지 자체를 수정하지 않습니다.

앱의 App Store 제품 페이지가 생성되면 `index.html`의 `app-store-badge-link` 한 곳만 수정합니다.

1. `href="https://apps.apple.com/..."`를 실제 제품 페이지 주소로 추가합니다.
2. `hidden` 속성을 제거합니다.
3. 같은 `hero-actions` 안의 `release-notice-button`을 제거합니다.

Apple 지침에 따라 한 레이아웃에는 배지를 하나만 노출하고, 화면에서 높이 40px 이상을 유지합니다.

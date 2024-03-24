# templates

next.js への依存あり。ステートの位置を考慮し、どこからでも意識せず使えるように、適切に use client と use server を設定する。
use client は最小限にする

## z-index ルール

- -1: 表面 B を A の下層に隠すとき
- 0: 表面 A
- 1: 表面 A に対するフローティングボタン
- 10: 表面 B
- 11: 表面 B に対するフローティングボタン
- 29: NavigationDrawerModal に対する Scrim
- 30: NavigationDrawerModal

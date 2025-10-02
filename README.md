📌 プロジェクト概要（NestJS 独学成果物）

このプロジェクトは、NestJSを独学で学習しながら、バックエンドアプリケーションの基本から応用機能まで一通り実装した学習成果物です。5月中旬から7月下旬にかけて、以下のような機能を段階的に完成させました。

✅ 実装した主な機能
1️⃣ 認証機能

JWT を利用したサインイン機能の実装

パスワードのハッシュ化とユーザー作成

AuthGuard / AuthenticationGuard / Token Guard の導入

Refresh Token 機能の追加

Google OAuth 認証

<img width="1505" height="602" alt="image" src="https://github.com/user-attachments/assets/8a2853cb-5ecc-4094-9b05-641c54f92b4a" />

<img width="793" height="936" alt="image" src="https://github.com/user-attachments/assets/713574bf-8646-48e5-8f9d-0594eb901c47" />

<img width="1246" height="772" alt="image" src="https://github.com/user-attachments/assets/8fdb2a0b-ffc0-4938-b977-4a9338ccbbb4" />

ログイン成功されました。

認証済みユーザー取得用デコレーター（ActiveUserDecorator）実装

Googleログイン後のユーザーデータ保存機能



2️⃣ API・DTO・バリデーション

DTO作成、Pipe・Decorator・Validation実装

Swagger によるAPIドキュメント作成

PartialType / Nested DTO対応

コンフィグ設定 .env の導入と秘匿化対応

3️⃣ DB / TypeORM 関連

Entity定義とDB連携確認

TypeORM導入

CRUD実装（GET/POST/DELETE）

Pagination対応

リレーション

OneToMany / ManyToOne / ManyToMany

Cascade Create / Cascade Delete / Eager Fetch

Soft Delete対応

Transaction処理 & エラーハンドリング実装

4️⃣ エラーハンドリング・共通処理

Exception Filter / Interceptor実装

エラーハンドリング統合

5️⃣ 外部連携

AWS S3 へのファイルアップロード機能
（Service実装〜最終アップロードまで完了）

✅ 使用技術・ライブラリ

NestJS

TypeORM

Swagger / Compodoc

JWT / Passport / Guards

Google OAuth



AWS S3　に　ファイルアップロード

<img width="2337" height="813" alt="image" src="https://github.com/user-attachments/assets/3ace124b-9ffa-40ac-955d-60b03f850543" />


dotenv

🛠 NestJSとは？

NestJS は、Node.js 上で構築する サーバーサイドアプリケーション向けのフレームワークです。
TypeScript を前提とし、モジュール構造・DI（依存性注入）・デコレーター構文など、Angularに似た設計思想で構成されています。
保守性・拡張性が高く、REST API・マイクロサービス・認証機能の実装などに適しています。

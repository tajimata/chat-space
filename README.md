# README



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add-index|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :users_groups
- has_many :messages
- has_many :groups


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belong_to :users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, foreign_key: true|
### Association
- has_many :users_groups
- has_many :users

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|comment_id|integer|null: false, foreign_key: true|
### Association
- belong_to :messages
- belong_to :users

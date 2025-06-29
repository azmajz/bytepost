# All Table Names + Columns

| table_name | column_name     | data_type                |
| ---------- | --------------- | ------------------------ |
| authors    | id              | uuid                     |
| authors    | username        | text                     |
| authors    | email           | text                     |
| authors    | full_name       | text                     |
| authors    | avatar_url      | text                     |
| authors    | bio             | text                     |
| authors    | website         | text                     |
| authors    | social_links    | jsonb                    |
| authors    | created_at      | timestamp with time zone |
| authors    | updated_at      | timestamp with time zone |
| post_tags  | id              | uuid                     |
| post_tags  | post_id         | uuid                     |
| post_tags  | tag_id          | uuid                     |
| post_tags  | created_at      | timestamp with time zone |
| posts      | id              | uuid                     |
| posts      | title           | text                     |
| posts      | content         | text                     |
| posts      | topic_id        | uuid                     |
| posts      | cover_image_url | text                     |
| posts      | author_id       | uuid                     |
| posts      | created_at      | timestamp with time zone |
| posts      | updated_at      | timestamp with time zone |
| posts      | published       | boolean                  |
| posts      | slug            | text                     |
| posts      | read_time       | integer                  |
| posts      | view_count      | integer                  |
| posts      | excerpt         | text                     |
| posts      | like_count      | integer                  |
| tags       | id              | uuid                     |
| tags       | name            | text                     |
| tags       | slug            | text                     |
| tags       | post_count      | integer                  |
| tags       | description     | text                     |
| topics     | id              | uuid                     |
| topics     | name            | text                     |
| topics     | slug            | text                     |
| topics     | icon            | text                     |
| topics     | post_count      | integer                  |
| topics     | description     | text                     |


# Table Relationships (Foreign Keys)

| source_table | source_column | target_table | target_column |
| ------------ | ------------- | ------------ | ------------- |
| posts        | topic_id      | topics       | id            |
| post_tags    | post_id       | posts        | id            |
| post_tags    | tag_id        | tags         | id            |
| posts        | author_id     | authors      | id            |
set names utf8mb4;
set foreign_key_checks = 0;
create table `joke_type` (
  `id` bigint unsigned not null auto_increment primary key,
  `type` varchar(255) not null,
  `created_at` datetime not null
) default character set utf8mb4 engine = InnoDB;
create table `joke` (
  `id` bigint unsigned not null auto_increment primary key,
  `joke` varchar(255) not null,
  `type_id` bigint unsigned not null,
  `created_at` datetime not null
) default character set utf8mb4 engine = InnoDB;
alter table `joke`
add index `joke_type_id_index`(`type_id`);
alter table `joke`
add constraint `joke_type_id_foreign` foreign key (`type_id`) references `joke_type` (`id`) on update cascade;
set foreign_key_checks = 1;

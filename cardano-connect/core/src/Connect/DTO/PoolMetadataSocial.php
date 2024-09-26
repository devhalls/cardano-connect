<?php
namespace WPCC\Connect\DTO;

class PoolMetadataSocial extends Base {
	/** @var string[] */
	public const FILLABLE = [
		'twitter_handle',
		'telegram_handle',
		'facebook_handle',
		'youtube_handle',
		'twitch_handle',
		'discord_handle',
		'github_handle',
		'linkedin_handle',
	];
	public function __construct(
		/** @var string|null  */
		public string|null $twitter_handle = null,
		/** @var string|null  */
		public string|null $telegram_handle = null,
		/** @var string|null */
		public string|null $facebook_handle = null,
		/** @var string|null */
		public string|null $youtube_handle = null,
		/** @var string|null */
		public string|null $twitch_handle = null,
		/** @var string|null */
		public string|null $discord_handle = null,
		/** @var string|null  */
		public string|null $github_handle = null,
		/** @var string|null  */
		public string|null $linkedin_handle = null,
	) {}
}
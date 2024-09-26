<?php
namespace WPCC\Connect\DTO;

class DrepMetadata extends Base  {
	public function __construct(
		/** @var string */
		public string $drep_id,
		/** @var string */
		public string $hex,
		/** @var string */
		public string $url,
		/** @var string */
		public string $hash,
		/** @var array */
		public array $json_metadata,
		/** @var string */
		public string $bytes,
	) {}
}

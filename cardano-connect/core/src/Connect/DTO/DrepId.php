<?php
namespace WPCC\Connect\DTO;

class DrepId extends Base {
	public function __construct(
		/** @var string */
		public string $drep_id,
		/** @var string */
		public string $hex,
	) {}
}

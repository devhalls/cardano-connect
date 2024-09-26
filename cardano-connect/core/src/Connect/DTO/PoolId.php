<?php
namespace WPCC\Connect\DTO;

class PoolId extends Base {
	public function __construct(
		/** @var string */
		public string $pool_id,
	) {}
}

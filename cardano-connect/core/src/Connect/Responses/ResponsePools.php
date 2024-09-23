<?php

namespace WPCC\Connect\Responses;

use WPCC\Connect\DTO\PoolId;

class ResponsePools {
	public function __construct(
		/** @var bool */
		public bool $success,
		/** @var PoolId[]|null */
		public array|null $response = null,
		/** @var int|null */
		public int|null $total = null,
		/** @var string|null */
		public string|null $message = null,
	) {}
}
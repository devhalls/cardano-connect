<?php

namespace WPCC\Connect\Responses;

use WPCC\Connect\DTO\Pool;

class ResponsePool {
	public function __construct(
		/** @var bool */
		public bool $success,
		/** @var Pool|null */
		public Pool|null $response = null,
		/** @var string|null */
		public string|null $message = null
	) {}
}
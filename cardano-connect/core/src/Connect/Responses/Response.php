<?php

namespace WPCC\Connect\Responses;

class Response {
	public function __construct(
		/** @var bool */
		public bool $success,
		/** @var mixed */
		public mixed $response = null,
		/** @var string|null */
		public string|null $message = null
	) {}
}
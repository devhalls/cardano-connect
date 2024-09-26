<?php

namespace WPCC\Connect\Responses;

use WPCC\Connect\DTO\Drep;

class ResponseDrep {
	public function __construct(
		/** @var bool */
		public bool $success,
		/** @var Drep|null */
		public Drep|null $response = null,
		/** @var string|null */
		public string|null $message = null
	) {}
}
<?php

namespace WPCC\Connect;

class Response {
	public bool $success;
	public ?string $message;
	public $response;

	public function __construct(bool $success, $response = null, string $message = null) {
		$this->success = $success;
		$this->message = $message;
		$this->response = $response;
	}
}
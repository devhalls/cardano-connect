<?php

namespace WPCC\Connect\Providers;

use WPCC\Connect\Base;
use WPCC\Connect\Response;
use WPCC\Connect\Interfaces\Signer;

class Upstream extends Base Implements Signer
{
	protected function setHeaders(): array {
		return [];
	}

	public function verify(string $stake_address, string $message, string $signature_key, string $signature_signed): Response
	{
		return $this->post('verify', [
			'address' => $stake_address,
			'message' => $message,
			'key' => $signature_key,
			'signature' => $signature_signed,
		]);
	}
}
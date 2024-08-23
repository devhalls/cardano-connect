<?php

namespace WPCC\Connect;

class Auth extends Base
{
	protected function setHeaders(): array {
		return [];
	}

	public function cardanoVerify(string $stake_address, string $message, string $signature_key, string $signature_signed): array
	{
		return $this->post('verify', [
			'address' => $stake_address,
			'message' => $message,
			'key' => $signature_key,
			'signature' => $signature_signed,
		]);
	}
}
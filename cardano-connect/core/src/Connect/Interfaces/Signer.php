<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Responses\Response;

interface Signer {
	public function verify(string $stake_address, string $message, string $signature_key, string $signature_signed): Response;
}
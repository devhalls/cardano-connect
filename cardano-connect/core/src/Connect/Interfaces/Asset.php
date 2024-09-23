<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Responses\Response;

interface Asset {
	public function getAsset( string $asset ): Response;
}
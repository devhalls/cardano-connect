<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Response;

interface Asset {
	public function getAsset( string $asset ): Response;
}
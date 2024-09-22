<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Response;

interface Account {
	public function getAccount( string $stake_address ): Response;

	public function getStakeHistory( string $stake_address ): Response;
}
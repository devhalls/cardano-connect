<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Response;

interface Account {
	public function getAccount( string $stake_address ): Response;

	public function getAccountStakeHistory( string $stake_address ): Response;
}
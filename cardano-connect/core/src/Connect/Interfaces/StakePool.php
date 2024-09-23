<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Response;

interface StakePool {

	public function getStakePools(int $page = 1, int $count = 10): Response;

	public function getStakePool(string $pool_id): Response;

	public function getStakePoolData( string $pool_id ): Response;

	public function getStakePoolMetadata( string $pool_id ): Response;
}
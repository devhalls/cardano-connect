<?php

namespace WPCC\Connect\Providers;

use WPCC\Connect\Base;
use WPCC\Connect\Response;
use WPCC\Connect\Interfaces\StakePool;

class Local extends Base implements StakePool
{
	protected function setHeaders(): array {
		return [];
	}

	public function getStakePools(int $page = 1, int $count = 10): Response {
		return $this->get('pools/extended', [
			'page' => $page,
			'count' => $count
		]);
	}

	public function getStakePoolData( string $pool_id ): Response {
		return $this->get( 'pools/' . $pool_id );
	}

	public function getStakePoolMetadata( string $pool_id ): Response {
		return $this->get( 'pools/' . $pool_id . '/metadata' );
	}
}
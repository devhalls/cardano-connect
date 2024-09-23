<?php

namespace WPCC\Connect\Providers;

use WPCC\Connect\Base;
use WPCC\Connect\Response;
use WPCC\Connect\Interfaces\Account;
use WPCC\Connect\Interfaces\Asset;
use WPCC\Connect\Interfaces\StakePool;

class BlockFrost extends Base implements Account, Asset, StakePool
{
	protected function setHeaders(): array {
		return [
			'project_id' => $this->api_key
		];
	}

	public function getAsset(string $asset): Response {
		return $this->get('assets/' . $asset);
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

	public function getAccount( string $stake_address ): Response {
		return $this->get('accounts/' . $stake_address );
	}

	public function getAccountStakeHistory(string $stake_address): Response {
		return $this->get('accounts/' . $stake_address . '/history');
	}
}
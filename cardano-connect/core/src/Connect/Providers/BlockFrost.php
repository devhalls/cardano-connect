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

	public function getStakePool(string $pool_id): Response {
		$data = $this->getStakePoolData($pool_id);
		$metadata = $this->getStakePoolMetaData($pool_id);
		if ($metadata->success) {
			$metadata_array = (array) $metadata->response;
			$metadata_file = $this->getJsonUrl($metadata_array['url']);
			$metadata_file_array = $metadata_file->success ? (array) $metadata_file->response : null;
			if (isset($metadata_file_array['extended'])) {
				$metadata_file_extended = $this->getJsonUrl($metadata_file_array['extended']);
				$metadata_file_extended_array = $metadata_file_extended->success ? (array) $metadata_file_extended->response : null;
			} else {
				$metadata_file_extended_array = null;
			}
			return new Response(
				true,
				[
					'data' => (array) $data->response,
					'metadata' => $metadata_array,
					'metadata_file' => $metadata_file_array,
					'metadata_file_extended' => $metadata_file_extended_array
				]
			);
		}
		return new Response(
			false,
			[]
		);
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
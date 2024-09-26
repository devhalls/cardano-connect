<?php

namespace WPCC\Connect\Providers;

use WPCC\Connect\Base;
use WPCC\Connect\DTO\DrepId;
use WPCC\Connect\DTO\DrepMetadata;
use WPCC\Connect\DTO\Pool;
use WPCC\Connect\DTO\PoolId;
use WPCC\Connect\DTO\Drep;
use WPCC\Connect\Interfaces\Drep as DrepInterface;
use WPCC\Connect\Responses\Response;
use WPCC\Connect\Interfaces\Account;
use WPCC\Connect\Interfaces\Asset;
use WPCC\Connect\Interfaces\StakePool;
use WPCC\Connect\Responses\ResponseDrep;
use WPCC\Connect\Responses\ResponseDreps;
use WPCC\Connect\Responses\ResponsePool;
use WPCC\Connect\Responses\ResponsePools;

class BlockFrost extends Base implements Account, Asset, StakePool, DrepInterface
{
	// Inherited methods.

	protected function setHeaders(): array {
		return [
			'project_id' => $this->api_key
		];
	}

	// Account interface.

	public function getAsset(string $asset): Response {
		return $this->get('assets/' . $asset);
	}

	// Asset interface.

	public function getAccount( string $stake_address ): Response {
		return $this->get('accounts/' . $stake_address );
	}

	public function getAccountStakeHistory(string $stake_address): Response {
		return $this->get('accounts/' . $stake_address . '/history');
	}

	// Stake interface.

	public function getStakePools(int $page = 1, int $count = 10, array|null $filters = null): ResponsePools {
		$response = $this->get('pools/extended', [
			'page' => $page,
			'count' => $count
		]);
		$formatted = [];
		if ($response->success) {
			foreach ($response->response as $item) {
				$formatted[] = new PoolId($item['pool_id']);
			}
		}
		return new ResponsePools(
			$response->success,
			$formatted,
			3001,
			$response->message,
		);
	}

	public function getStakePool(string $pool_id): ResponsePool {
		$filter_metadata = static fn (array $data) => array_filter($data, static fn ($a) => !in_array($a, ['pool_id', 'hex']), ARRAY_FILTER_USE_KEY);
		$data = $this->getStakePoolData($pool_id);
		$data_array = $data->success ? (array) $data->response : null;
		$metadata = $this->getStakePoolMetaData($pool_id);
		$metadata_array = $metadata->success ? $filter_metadata((array) $metadata->response) : [];
		$metadata_file_array = [];
		$metadata_file_extended_array = null;
		$pool = __('Error importing pool', 'cardano-connect');

		if ($metadata->success) {
			$metadata_file = !empty($metadata_array['url']) ? $this->getJsonUrl($metadata_array['url']) : new Response(false);
			$metadata_file_array = $metadata_file->success ? $filter_metadata((array) $metadata_file->response) : [];
			if (isset($metadata_file_array['extended'])) {
				$metadata_file_extended = $this->getJsonUrl($metadata_file_array['extended']);
				$metadata_file_extended_array = $metadata_file_extended->success ? (array) $metadata_file_extended->response : [];
				if (isset($metadata_file_extended_array['when-satured-then-recommend'])) {
					$metadata_file_extended_array['when_saturated_then_recommend'] = is_array( $metadata_file_extended_array['when-satured-then-recommend'] )
						? $metadata_file_extended_array['when-satured-then-recommend']
						: null;
				}
			}
		}
		if ($data_array) {
			$pool = Pool::fromArray(
				$data_array,
				array_merge(
					$metadata_array,
					$metadata_file_array,
				),
				$metadata_file_extended_array
			);
		}
		return new ResponsePool(
			$pool instanceof Pool,
			is_string($pool) ? null : $pool,
			is_string($pool) ? $pool : null
		);
	}

	// Drep interface.


	public function getDreps( int $page = 1, int $count = 10, ?array $filters = null ): ResponseDreps
	{
		$response = $this->get('governance/dreps', [
			'page' => $page,
			'count' => $count
		]);
		$formatted = [];
		if ($response->success) {
			foreach ($response->response as $item) {
				$formatted[] = new DrepId(...$item);
			}
		}
		return new ResponseDreps(
			$response->success,
			$formatted,
			3001,
			$response->message,
		);
	}

	public function getDrep( string $drep_id ): ResponseDrep
	{
		$response = $this->get( 'governance/dreps/' . $drep_id );
		$data_arr = $response->success ? (array) $response->response : null;
		if ($data_arr) {
			$response_metadata = $this->get( 'governance/dreps/' . $drep_id . '/metadata');
			if ($response_metadata->success) {
				$metadata_arr = new DrepMetadata(...$response_metadata->response);
				$data_arr = array_merge(
					$data_arr,
					[ 'metadata' =>  $metadata_arr ]
				);
			}
			$drep = new Drep(...$data_arr);
			return new ResponseDrep(true, $drep);
		}
		return new ResponseDrep(
			$response->success,
			$response->response,
			$response->message
		);
	}

	// BlockFrost specific helpers.

	private function getStakePoolData( string $pool_id ): Response
	{
		return $this->get( 'pools/' . $pool_id );
	}

	private function getStakePoolMetadata( string $pool_id ): Response
	{
		return $this->get( 'pools/' . $pool_id . '/metadata' );
	}
}
<?php
namespace WPCC\Connect\DTO;

use Exception;

class Pool {
	/** @var string[] */
	public const FILLABLE = [
		'pool_id',
		'hex',
		'vrf_key',
		'blocks_minted',
		'blocks_epoch',
		'live_stake',
		'live_size',
		'live_saturation',
		'live_delegators',
		'active_stake',
		'active_size',
		'declared_pledge',
		'live_pledge',
		'margin_cost',
		'fixed_cost',
		'reward_account',
		'owners',
		'registration',
		'retirement',
		'metadata',
		'metadata_extended',
		'synced_at'
	];
	public function __construct(
		/** @var string */
		public string $pool_id,
		/** @var string */
		public string $hex,
		/** @var string */
		public string $vrf_key,
		/** @var int */
		public int $blocks_minted,
		/** @var int */
		public int $blocks_epoch,
		/** @var string */
		public string $live_stake,
		/** @var float */
		public float $live_size,
		/** @var float */
		public float $live_saturation,
		/** @var int */
		public int $live_delegators,
		/** @var string */
		public string $active_stake,
		/** @var float */
		public float $active_size,
		/** @var string */
		public string $declared_pledge,
		/** @var string */
		public string $live_pledge,
		/** @var float */
		public float $margin_cost,
		/** @var string */
		public string $fixed_cost,
		/** @var string|null */
		public string|null $reward_account = null,
		/** @var string[]|null */
		public array|null $owners = null,
		/** @var string[]|null */
		public array|null $registration = null,
		/** @var string[]|null */
		public array|null $retirement = null,
		/** @var PoolMetadata|null */
		public PoolMetadata|null $metadata = null,
		/** @var PoolMetadataExtended|null */
		public PoolMetadataExtended|null $metadata_extended = null,
		/** @var string|null */
		public string|null $synced_at = null,
	) {}

	/**
	 * Build object from self::FILLABLE array.
	 * Returns string on error containing the error message.
	 */
	public static function fromArray(
		array $data_arr,
		array|null $metadata_arr = null,
		array|null $metadata_extended_arr = null
	): self|string {
		try {
			// Filter input arrays by fillable fields.
			$data_arr = self::filterKeys($data_arr, self::FILLABLE);
			$metadata_arr = $metadata_arr ? self::filterKeys($metadata_arr, PoolMetadata::FILLABLE) : null;
			$metadata_extended_arr = $metadata_extended_arr ? self::filterKeys($metadata_extended_arr, PoolMetadataExtended::FILLABLE) : null;

			// Format extended data from arrays.
			if ( $metadata_extended_arr ) {
				$metadata_extended_arr['info'] = $metadata_extended_arr['info'] ?? [];
				$metadata_extended_arr['info']['social'] = !empty($metadata_extended_arr['info']['social'])
					? self::filterKeys($metadata_extended_arr['info']['social'], PoolMetadataSocial::FILLABLE)
					: [];
				$metadata_extended_arr['itn'] = !empty($metadata_extended_arr['itn'])
					? new PoolItn( ...self::filterKeys($metadata_extended_arr['itn'], PoolItn::FILLABLE) )
					: null;
				$formatted = [
					'url_png_icon_64x64' => $metadata_extended_arr['info']['url_png_icon_64x64'] ?? null,
					'url_png_logo' => $metadata_extended_arr['info']['url_png_logo'] ?? null,
					'location' => $metadata_extended_arr['info']['location'] ?? null,
					'social' => new PoolMetadataSocial( ...$metadata_extended_arr['info']['social'] ),
					'verification_cexplorer' => $metadata_extended_arr['info']['verification_cexplorer'] ?? null,
				];
				$metadata_extended_arr['info'] = new PoolMetadataInfo( ...$formatted );
			}

			// Convert data to Pool models.
			$data_arr['metadata_extended'] = $metadata_extended_arr ? new PoolMetadataExtended( ...$metadata_extended_arr ) : null;
			$data_arr['metadata'] = $metadata_arr ? new PoolMetadata( ...$metadata_arr ) : null;
			return new Pool( ...$data_arr );
		}
		catch ( Exception $e ) {
			return $e->getMessage();
		}
	}

	/**
	 * Build object from post_id and post metadata.
	 * Returns string on error containing the error message.
	 */
	public static function fromPost(
		int $post_id
	): self|string {
		$pool_arr = [];
		foreach (self::FILLABLE as $k) {
			$pool_arr[$k] = get_post_meta($post_id, $k, true);
		}
		$pool_metadata_arr = !empty($pool_arr['metadata']) ? $pool_arr['metadata'] : null;
		$pool_metadata_extended_arr = !empty($pool_arr['metadata_extended']) ? $pool_arr['metadata_extended'] : null;
		return self::fromArray(
			$pool_arr,
			$pool_metadata_arr,
			$pool_metadata_extended_arr
		);
	}

	/**
	 * Recursive toArray converting Post to assoc.
	 */
	public function toArray(
		array|null $data = null
	): array {
		$array = $data ?: (array) $this;
		foreach ($array as $k => $a) {
			if (is_object($a)) {
				$array[ $k ] = $this->toArray((array) $a);
			} else {
				$array[ $k ] = $a;
			}
		}
		return $array;
	}

	/**
	 * Filter passed $data_arr by the $filter_keys.
	 */
	public static function filterKeys(array $data_arr, array $filter_keys): array {
		return array_filter($data_arr, static fn ($a) => in_array( $a, $filter_keys, true ), ARRAY_FILTER_USE_KEY);
	}
}

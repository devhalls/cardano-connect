<?php
namespace WPCC\Connect\DTO;

class PoolMetadataExtended extends Base {
	/** @var string[] */
	public const FILLABLE = [
		'info',
		'when_saturated_then_recommend',
		'itn',
		'votes',
	];
	public function __construct(
		/** @var PoolMetadataInfo  */
		public PoolMetadataInfo $info,
		/** @var string[]|null  */
		public array|null $when_saturated_then_recommend = null,
		/** @var PoolItn|null  */
		public PoolItn|null $itn = null,
		/** @var string[]|null  */
		public array|null $votes = null,
	) {}
}
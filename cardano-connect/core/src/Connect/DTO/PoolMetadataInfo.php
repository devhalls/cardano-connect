<?php
namespace WPCC\Connect\DTO;

class PoolMetadataInfo extends Base {
	public function __construct(
		/** @var string|null  */
		public string|null $url_png_icon_64x64 = null,
		/** @var string|null  */
		public string|null $url_png_logo = null,
		/** @var string|null  */
		public string|null $location = null,
		/** @var PoolMetadataSocial|null  */
		public PoolMetadataSocial|null $social = null,
		/** @var string|null  */
		public string|null $verification_cexplorer = null,
	) {}
}
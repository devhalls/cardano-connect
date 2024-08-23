<?php

namespace WPCC;

class Theme extends Base
{
	/**
	 * Returns self.
	 * $theme = (new WPCC\Theme()))->run()
	 * @return self
	 */
    public function run(): self {
	    return $this;
    }
}
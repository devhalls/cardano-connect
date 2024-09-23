<?php

namespace WPCC\Connect\Interfaces;

interface PostType {
	public function getConfig(): array;

	public function registerHooks(): void;
}
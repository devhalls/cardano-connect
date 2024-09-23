<?php

namespace WPCC\Connect;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use WPCC\Connect\Responses\Response;

abstract class Base
{
	protected string $base_uri;

	protected string|null $api_key = null;

	protected array $headers = [];

	public Client $client;

	public function __construct(string $endpoint, string|null $api_key = null) {
		$this->base_uri = $endpoint;
		$this->api_key = $api_key;
		$this->headers = $this->setHeaders();
		$this->client = new Client([
			'base_uri' => $this->base_uri,
			'http_errors' => true,
			'delay'       => 0,
			'headers'     => array_merge(
				[
					'Content-Type' => 'application/json',
					'Accept' => 'application/json, */*;q=0.5',
				],
				$this->headers
			)
		]);
	}

	abstract protected function setHeaders(): array;

	public function get(string $uri, array $query = null): Response
	{
		try {
			$response = $this->client->get($uri, $query ? [
				RequestOptions::QUERY => $query
			] : []);
			$result = json_decode(
				$response->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR
			);
			return new Response(true, $result);
		} catch ( GuzzleException $e ) {
			return new Response(false, $e->getMessage());
		} catch ( Exception $e ) {
			return new Response(false, $e->getMessage());
		}
	}

	public function post(string $uri, $data = []): Response
	{
		try {
			$response = $this->client->post($uri, [RequestOptions::JSON => $data]);
			$result = json_decode(
				$response->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR
			);
			return new Response(true, $result);
		} catch ( GuzzleException $e ) {
			return new Response(false, $e->getMessage());
		} catch ( Exception $e ) {
			return new Response(false, $e->getMessage());
		}
	}

	public function getJsonUrl( string $url ): Response
	{
		return $this->get( $url );
	}
}
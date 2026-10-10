<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiStatusTest extends TestCase
{
    public function test_status_endpoint_returns_running_message(): void
    {
        $this->getJson('/api/status')
            ->assertOk()
            ->assertJsonPath('status', 'Laravel API is running');
    }

    public function test_blogspot_origin_is_allowed_by_cors(): void
    {
        $this->getJson('/api/status', ['Origin' => 'https://pesonaku.blogspot.com'])
            ->assertOk()
            ->assertHeader('Access-Control-Allow-Origin', 'https://pesonaku.blogspot.com');
    }

    public function test_preflight_from_blogspot_is_allowed(): void
    {
        $this->call('OPTIONS', '/api/status', [], [], [], [
            'HTTP_ORIGIN' => 'https://pesonaku.blogspot.com',
            'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'GET',
        ])->assertHeader('Access-Control-Allow-Origin', 'https://pesonaku.blogspot.com');
    }

    public function test_unknown_origin_is_not_allowed_by_cors(): void
    {
        $this->getJson('/api/status', ['Origin' => 'https://evil.example.com'])
            ->assertOk()
            ->assertHeaderMissing('Access-Control-Allow-Origin');
    }
}

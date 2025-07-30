<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Service;

use App\Dto\BaselineDto;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Yaml\Yaml;

class BaselineService
{
    private string $projectDir;
    private ?ArrayCollection $baselineFeatures = null;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }

    public function getAll(): ArrayCollection
    {
        if ($this->baselineFeatures === null) {
            $this->loadBaselineFeatures();
        }

        return $this->baselineFeatures;
    }

    public function get(string $identifier): ?BaselineDto
    {
        $features = $this->getAll();

        foreach ($features as $feature) {
            if ($feature->getIdentifier() === $identifier) {
                return $feature;
            }
        }

        return null;
    }

    public function getMultiple(array $identifiers): ArrayCollection
    {
        $result = new ArrayCollection();

        foreach ($identifiers as $identifier) {
            $feature = $this->get($identifier);
            if ($feature !== null) {
                $result->add($feature);
            }
        }

        return $result;
    }

    private function loadBaselineFeatures(): void
    {
        $this->baselineFeatures = new ArrayCollection();
        $baselineFile = $this->projectDir . '/resources/baseline.yaml';

        if (!file_exists($baselineFile)) {
            return;
        }

        $config = Yaml::parseFile($baselineFile);

        if (!isset($config['features']) || !is_array($config['features'])) {
            return;
        }

        foreach ($config['features'] as $identifier => $featureConfig) {
            $baseline = new BaselineDto();
            $baseline->setIdentifier($identifier);
            $baseline->setName($featureConfig['name'] ?? $identifier);
            $baseline->setMdn($featureConfig['mdn'] ?? null);

            if (isset($featureConfig['year']) && isset($featureConfig['month'])) {
                $availableDate = new DateTime(sprintf('%d-%02d-01', $featureConfig['year'], $featureConfig['month']));
                $baseline->setAvailableDate($availableDate);
            }

            $this->baselineFeatures->add($baseline);
        }
    }
}

<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Service;

use App\Dto\DemoDto;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Yaml\Yaml;
use Twig\Environment;

class DemoService
{
    private string $projectDir;
    private Environment $environment;

    public function __construct(
        string $projectDir,
        Environment $environment
    ) {
        $this->projectDir = $projectDir;
        $this->environment = $environment;
    }

    public function get(string $identifier = null): ?DemoDto
    {
        $criteria = Criteria::create();
        $criteria->andWhere(Criteria::expr()->eq('identifier', $identifier));
        $result = $this->getAll()->matching($criteria);

        if ($demo = $result->first()) {
            return $demo;
        }

        return null;
    }

    public function getAll(): ArrayCollection
    {
        $demoDirectory = $this->projectDir . '/resources/demos';
        if (!file_exists($demoDirectory)) {
            mkdir($demoDirectory, 0777, true);
        }

        $demos = new ArrayCollection();
        $finder = new Finder();
        $finder->directories()->in($this->projectDir . '/resources/demos')->depth(0);
        $directories = iterator_to_array($finder, false);

        foreach ($directories as $directory) {
            $identifier = $directory->getFilename();
            $config = Yaml::parseFile($directory->getPathname() . '/config.yaml');

            $data = [];
            $data['identifier'] = $identifier;
            $data['data'] = $config['data'] ?? [];

            $demo = new DemoDto();
            $demo->setIdentifier($identifier);
            $demo->setName($config['name'] ?? $identifier);
            $demo->setContent($this->environment->render('demos/' . $identifier . '/index.html.twig', $data));
            if (file_exists($directory->getPathname() . '/styles.css')) {
                $demo->setStyles(file_get_contents($directory->getPathname() . '/styles.css'));
            }

            $demos->add($demo);
        }

        $criteria = Criteria::create()
            ->orderBy(['identifier' => Criteria::ASC]);

        return $demos->matching($criteria);
    }
}

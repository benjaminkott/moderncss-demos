<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Menu;

use App\Service\DemoService;
use Knp\Menu\FactoryInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuBuilder
{
    protected FactoryInterface $factory;
    protected ParameterBagInterface $parameterBag;
    protected DemoService $demoService;

    public function __construct(
        FactoryInterface $factory,
        ParameterBagInterface $parameterBag,
        DemoService $demoService
    ) {
        $this->factory = $factory;
        $this->parameterBag = $parameterBag;
        $this->demoService = $demoService;
    }

    public function createMainMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');
        $menu->addChild(
            'index',
            [
                'label' => 'Home',
                'route' => 'app_application_index',
            ]
        );

        foreach ($this->demoService->getAll() as $demo) {
            $menu->addChild(
                'demo_' . $demo->getIdentifier(),
                [
                    'label' => ($demo->getNew() ? '🔥 ' : '') . $demo->getLabel(),
                    'route' => 'app_demo_show',
                    'routeParameters' => [
                        'identifier' => $demo->getIdentifier(),
                    ],
                ]
            );
        }

        return $menu;
    }
}

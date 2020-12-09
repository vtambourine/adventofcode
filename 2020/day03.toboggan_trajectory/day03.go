package day03

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

const TREE = '#'

func countTrees(grid *challenge.Grid, dx, dy int) int {
	width, height := grid.Size()

	trees := 0

	var x, y int
	for y < height {
		if grid.CellAt(x, y) == TREE {
			trees++
		}

		x += dx
		x %= width
		y += dy
	}

	return trees
}

func Trees(c *challenge.Challenge) int {
	grid := c.Grid()

	return countTrees(grid, 3, 1)
}

func Slopes(c *challenge.Challenge) int {
	grid := c.Grid()

	result := 1
	slopes := []struct {
		dx, dy int
	}{
		{1, 1},
		{3, 1},
		{5, 1},
		{7, 1},
		{1, 2},
	}

	for _, s := range slopes {
		result *= countTrees(grid, s.dx, s.dy)
	}

	return result
}

func Register(s command.Solutions) {
	s.Register(3, "a", Trees)
	s.Register(3, "b", Slopes)
}

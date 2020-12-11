package day11

import "github.com/vtambourine/adventofcode/2020/challenge"

type automata struct {
	grid          *challenge.Grid
	nextGrid      *challenge.Grid
	width, height int
}

func newAutomata(width, height int) *automata {
	return &automata{
		grid:     challenge.NewGrid(width, height),
		nextGrid: challenge.NewGrid(width, height),
		width:    width,
		height:   height,
	}
}

func newAutomataFromGrid(grid *challenge.Grid) *automata {
	width, height := grid.Size()
	automata := newAutomata(width, height)

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			automata.grid.SetCell(x, y, grid.CellAt(x, y))
		}
	}

	return automata
}

func (a *automata) iterate(rule func(x, y int, g *challenge.Grid) rune) {
	for y := 0; y < a.height; y++ {
		for x := 0; x < a.width; x++ {
			a.nextGrid.SetCell(x, y, rule(x, y, a.grid))
		}
	}
	*a.grid, *a.nextGrid = *a.nextGrid, *a.grid
}

func (a *automata) isStable() bool {
	return a.grid.Equal(a.nextGrid)
}

func (a *automata) countTokens(t rune) int {
	count := 0
	for _, c := range a.grid.Cells() {
		if t == c {
			count++
		}
	}
	return count
}

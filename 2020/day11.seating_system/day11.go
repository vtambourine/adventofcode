package day11

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

var (
	tokenEmpty    = 'L'
	tokenOccupied = '#'
	tokenFloor    = '.'
)

func checkNeighbours(x, y int, grid *challenge.Grid) rune {
	occupied := 0
	neighbours := grid.NeighboursAt(x, y)

	for _, n := range neighbours {
		if n == tokenOccupied {
			occupied++
		}
	}

	seat := grid.CellAt(x, y)
	switch seat {
	case tokenOccupied:
		if occupied >= 4 {
			return tokenEmpty
		}
		return tokenOccupied
	case tokenEmpty:
		if occupied == 0 {
			return tokenOccupied
		}
		return tokenEmpty
	}
	return seat
}

func occupiedSeats(input *challenge.Challenge) int {
	seating := newAutomataFromGrid(input.Grid())

	guard := 1e5
	for guard > 0 && !seating.isStable() {
		guard--
		seating.iterate(checkNeighbours)
	}

	if guard == 0 {
		panic("no solution")
	}

	return seating.countTokens(tokenOccupied)
}

var directions = [][2]int{
	{-1, -1}, {0, -1}, {1, -1},
	{-1, 0}, {1, -0},
	{-1, 1}, {0, 1}, {1, 1},
}

func firstInSight(x, y, dx, dy int, grid *challenge.Grid) rune {
	width, height := grid.Size()
	xp, yp := x+dx, y+dy
	for xp >= 0 && yp >= 0 && xp < width && yp < height {
		t := grid.CellAt(xp, yp)
		if t != tokenFloor {
			return t
		}
		xp, yp = xp+dx, yp+dy
	}
	return tokenFloor
}

func checkSight(x, y int, grid *challenge.Grid) rune {
	occupied := 0
	for _, d := range directions {
		t := firstInSight(x, y, d[0], d[1], grid)
		if t == tokenOccupied {
			occupied++
		}
	}

	seat := grid.CellAt(x, y)
	switch seat {
	case tokenOccupied:
		if occupied >= 5 {
			return tokenEmpty
		}
		return tokenOccupied
	case tokenEmpty:
		if occupied == 0 {
			return tokenOccupied
		}
		return tokenEmpty
	}
	return seat
}

func visibleSeats(input *challenge.Challenge) int {
	seating := newAutomataFromGrid(input.Grid())

	guard := 1e4
	for guard > 0 && !seating.isStable() {
		guard--
		seating.iterate(checkSight)
	}

	if guard == 0 {
		panic("no solution")
	}

	return seating.countTokens(tokenOccupied)
}

func Register(s command.Solutions) {
	s.Register(11, "a", occupiedSeats)
	s.Register(11, "b", visibleSeats)
}

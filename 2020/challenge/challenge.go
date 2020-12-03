package challenge

import (
	"bufio"
	"io"
	"os"
	"strconv"
	"strings"
)

type Challenge struct {
	scanner *bufio.Scanner
	lines   chan string
}

func newChallengeFromReader(r io.Reader, c io.Closer) *Challenge {
	challenge := &Challenge{
		scanner: bufio.NewScanner(r),
		lines:   make(chan string),
	}

	go func() {
		defer func() {
			if c != nil {
				_ = c.Close()
			}
		}()

		for challenge.scanner.Scan() {
			challenge.lines <- challenge.scanner.Text()
		}

		close(challenge.lines)
	}()

	return challenge
}

func ReadChallengeFromFile(path string) *Challenge {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}

	return newChallengeFromReader(file, file)
}

func ReadChallengeFromLiteral(input string) *Challenge {
	return newChallengeFromReader(strings.NewReader(input), nil)
}

func (c *Challenge) Lines() <-chan string {
	return c.lines
}

func (c *Challenge) LineSlice() (result []string) {
	for line := range c.lines {
		result = append(result, line)
	}
	return
}

func (c *Challenge) IntSlice() (result []int) {
	for line := range c.lines {
		i, err := strconv.Atoi(line)
		if err != nil {
			panic(err)
		}
		result = append(result, i)
	}
	return
}

func (c *Challenge) Grid() *Grid {
	lines := c.LineSlice()

	g := NewGrid(len(lines[0]), len(lines))

	for row, line := range lines {
		for column, cell := range line {
			g.SetCell(column, row, cell)
		}
	}

	return g
}

type Grid struct {
	cells  []rune
	width  int
	height int
}

func NewGrid(width, height int) *Grid {
	return &Grid{
		cells:  make([]rune, width*height),
		width:  width,
		height: height,
	}
}

func (g *Grid) Size() (int, int) {
	return g.width, g.height
}

func (g *Grid) boundsCheck(x, y int) {
	if x < 0 || y < 0 || x >= g.width || y >= g.height {
		panic("out of bounds")
	}
}

func (g *Grid) indexOf(x, y int) int {
	g.boundsCheck(x, y)
	return x + (g.width * y)
}

func (g *Grid) SetCell(x, y int, cell rune) {
	g.cells[g.indexOf(x, y)] = cell
}

func (g *Grid) CellAt(x, y int) rune {
	g.boundsCheck(x, y)
	return g.cells[g.indexOf(x, y)]
}

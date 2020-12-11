package challenge

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"runtime"
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

func ReadFromDay(day int) *Challenge {
	_, sourceFile, _, ok := runtime.Caller(1)
	if !ok {
		panic("failed to determine input path")
	}

	daysDirs, err := ioutil.ReadDir(filepath.Dir(sourceFile))
	if err != nil {
		panic(err)
	}

	var path string
	for _, d := range daysDirs {
		if strings.HasPrefix(d.Name(), fmt.Sprintf("day%02d", day)) {
			path = filepath.Join(filepath.Dir(sourceFile), d.Name(), fmt.Sprintf("day%02d.input", day))
		}
	}

	if path == "" {
		panic(fmt.Sprintf("failed to determine input path for day %d", day))
	}

	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}

	return newChallengeFromReader(file, file)
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

func (g *Grid) Cells() []rune {
	return g.cells
}

func (g *Grid) boundsCheck(x, y int) {
	if x < 0 || y < 0 || x >= g.width || y >= g.height {
		panic("out of bounds")
	}
}

func (g *Grid) inBounds(x, y int) bool {
	if x < 0 || y < 0 || x >= g.width || y >= g.height {
		return false
	}
	return true
}

func (g *Grid) indexOf(x, y int) int {
	g.boundsCheck(x, y)
	return x + (g.width * y)
}

func (g *Grid) CoordinatesOf(i int) (int, int) {
	if i >= g.width*g.height {
		panic("index out of bounds")
	}
	return i % g.width, i / g.width
}

func (g *Grid) SetCell(x, y int, cell rune) {
	g.cells[g.indexOf(x, y)] = cell
}

func (g *Grid) CellAt(x, y int) rune {
	g.boundsCheck(x, y)
	return g.cells[g.indexOf(x, y)]
}

var directions = [][2]int{
	{-1, -1}, {0, -1}, {1, -1},
	{-1, 0}, {1, -0},
	{-1, 1}, {0, 1}, {1, 1},
}

func (g *Grid) NeighboursAt(x, y int) []rune {
	n := make([]rune, 0)
	var dx, dy int
	for _, d := range directions {
		dx, dy = x+d[0], y+d[1]
		if g.inBounds(dx, dy) {
			n = append(n, g.CellAt(dx, dy))
		}
	}
	return n
}

func (g *Grid) Equal(other *Grid) bool {
	for i, c := range g.Cells() {
		xa, ya := g.CoordinatesOf(i)
		if c != other.CellAt(xa, ya) {
			return false
		}
	}
	return true
}

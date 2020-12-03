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

func (c *Challenge) Lines() <- chan string {
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

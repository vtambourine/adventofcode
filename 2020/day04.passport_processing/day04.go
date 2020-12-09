package day04

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func ValidPassports(c *challenge.Challenge) int {
	count := 0

	lines := c.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.valid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}

func StrictlyValidPassports(c *challenge.Challenge) int {
	count := 0

	lines := c.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.strictlyValid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}

func Register(s command.Solutions) {
	s.Register(4, "a", ValidPassports)
	s.Register(4, "b", StrictlyValidPassports)
}

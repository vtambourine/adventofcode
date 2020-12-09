package day02

import (
	"github.com/vtambourine/adventofcode/2020/command"
	"regexp"
	"strings"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/util"
)

type policy struct {
	char rune
	min  int
	max  int
}

func parsePolicy(line string) policy {
	re := regexp.MustCompile(`(\d+)-(\d+) ([[:lower:]])`)
	matches := re.FindAllStringSubmatch(line, -1)

	return policy{
		char: []rune(matches[0][3])[0],
		min:  util.MustAtoi(matches[0][1]),
		max:  util.MustAtoi(matches[0][2]),
	}
}

func (p policy) valid(password string) bool {
	count := 0

	for _, r := range password {
		if r == p.char {
			count++
		}
	}

	return count >= p.min && count <= p.max
}

func (p policy) strictlyValid(password string) bool {
	return (rune(password[p.min-1]) == p.char) != (rune(password[p.max-1]) == p.char)
}

func Policy(c *challenge.Challenge) int {
	valid := 0

	for line := range c.Lines() {
		parts := strings.Split(line, ": ")
		if parsePolicy(parts[0]).valid(parts[1]) {
			valid++
		}
	}

	return valid
}

func NewPolicy(c *challenge.Challenge) int {
	valid := 0

	for line := range c.Lines() {
		parts := strings.Split(line, ": ")
		if parsePolicy(parts[0]).strictlyValid(parts[1]) {
			valid++
		}
	}

	return valid
}

func Register(s command.Solutions) {
	s.Register(1, "a", Policy)
	s.Register(1, "b", NewPolicy)
}

package day07

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

func TestTwo(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := nestedBags(input)
	assert.Equal(t, 4, got)
}

func TestCost(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := totalBags(input)
	assert.Equal(t, 32, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day07.input")
	got := nestedBags(input)
	assert.Equal(t, 179, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day07.input")
	got := totalBags(input)
	assert.Equal(t, 18925, got)
}
